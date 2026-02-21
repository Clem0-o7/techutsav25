"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, X, FileText, AlertCircle } from "lucide-react"

export function FileUpload({ 
  eventType, 
  details, 
  onSuccess, 
  onCancel, 
  existingSubmission 
}) {
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState(existingSubmission?.title || "")
  const [description, setDescription] = useState(existingSubmission?.description || "")
  const [abstract, setAbstract] = useState(existingSubmission?.abstract || "") // New field for papers
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState("")
  const fileInputRef = useRef(null)

  const isPaperPresentation = eventType === "paper-presentation"

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0]
    if (!selectedFile) return

    // Validate file type
    const fileExtension = "." + selectedFile.name.split('.').pop().toLowerCase()
    if (!details.allowedTypes.includes(fileExtension)) {
      setError(`File type ${fileExtension} not allowed. Accepted: ${details.allowedTypes.join(", ")}`)
      return
    }

    // Validate file size (convert details.maxSize to bytes)
    const maxSizeInMB = parseInt(details.maxSize.replace("MB", ""))
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024
    if (selectedFile.size > maxSizeInBytes) {
      setError(`File size exceeds ${details.maxSize} limit`)
      return
    }

    setFile(selectedFile)
    setError("")
  }

  const handleRemoveFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e, isDraft = false) => {
    e.preventDefault()
    
    if (!title.trim()) {
      setError("Please provide a title")
      return
    }

    if (isPaperPresentation && !abstract.trim()) {
      setError("Please provide an abstract for paper presentation")
      return
    }

    if (!isDraft && !file && !existingSubmission) {
      setError("Please select a file for final submission")
      return
    }

    setUploading(true)
    setUploadProgress(0)
    setError("")

    try {
      const formData = new FormData()
      if (file) {
        console.log('File being uploaded:', file.name, file.size, file.type)
        formData.append("file", file)
      }
      formData.append("eventType", eventType)
      formData.append("title", title.trim())
      formData.append("description", description.trim())
      if (isPaperPresentation) {
        formData.append("abstract", abstract.trim())
      }
      formData.append("isDraft", isDraft.toString())
      if (existingSubmission) {
        formData.append("submissionId", existingSubmission._id)
      }

      // Upload with progress tracking
      const response = await fetch("/api/submissions/upload", {
        method: "POST",
        body: formData,
        credentials: "include"
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Upload failed")
      }

      const result = await response.json()
      setUploadProgress(100)
      
      // Small delay to show completion
      setTimeout(() => {
        console.log('Submission successful:', result)
        onSuccess(result)
      }, 500)

    } catch (error) {
      console.error("Upload error:", error)
      setError(error.message || "Failed to upload file")
    } finally {
      setUploading(false)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg">
            {existingSubmission ? "Update" : "Submit"} {details.title}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            disabled={uploading}
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title Input */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter submission title"
                disabled={uploading}
                required
              />
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of your submission"
                className="w-full min-h-[60px] px-3 py-2 border border-input rounded-md bg-background text-sm resize-none"
                disabled={uploading}
              />
            </div>

            {/* Abstract Input - Only for Paper Presentations */}
            {isPaperPresentation && (
              <div className="space-y-2">
                <Label htmlFor="abstract">Abstract *</Label>
                <textarea
                  id="abstract"
                  value={abstract}
                  onChange={(e) => setAbstract(e.target.value)}
                  placeholder="Enter your paper abstract (research objectives, methodology, key findings)"
                  className="w-full min-h-[120px] px-3 py-2 border border-input rounded-md bg-background text-sm resize-none"
                  disabled={uploading}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  💡 Include research objectives, methodology, and key findings
                </p>
              </div>
            )}

            {/* File Upload */}
            <div className="space-y-2">
              <Label>File {!existingSubmission && "*"}</Label>
              <div className="relative border-2 border-dashed border-input rounded-lg p-4 text-center">
                {file ? (
                  <div className="flex items-center justify-between bg-muted rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <div className="text-left">
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveFile}
                      disabled={uploading}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">
                          {existingSubmission ? "Replace file (optional)" : "Click to upload or drag and drop"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {details.allowedTypes.join(", ")} up to {details.maxSize}
                        </p>
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileSelect}
                      accept={details.allowedTypes.join(",")}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={uploading}
                    />
                  </>
                )}
              </div>
            </div>
              
            

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            {/* Upload Progress */}
            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={uploading}
                className="flex-1"
              >
                Cancel
              </Button>
              
              {/* Save Draft Button */}
              <Button
                type="button"
                variant="secondary"
                onClick={(e) => handleSubmit(e, true)}
                disabled={uploading || !title.trim() || (isPaperPresentation && !abstract.trim())}
                className="flex-1"
              >
                {uploading ? "Saving..." : "Save Draft"}
              </Button>
              
              {/* Submit Button */}
              <Button
                type="submit"
                onClick={(e) => handleSubmit(e, false)}
                disabled={uploading || !title.trim() || (isPaperPresentation && !abstract.trim()) || (!existingSubmission && !file)}
                className="flex-1"
              >
                {uploading ? "Submitting..." : (existingSubmission ? "Update" : "Submit")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}