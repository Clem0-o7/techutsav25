"use client";

import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  useMediaQuery,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Paper,
  Grow,
  Popper,
  MenuItem,
  MenuList,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Footer from "@/components/Footer";
import MainLoader from "@/components/MainLoader";
import { SnackbarComponent } from "@/components/SnackbarComponent";
import animationData from "@/lotties/profile.json";

const Profile = () => {
  const options = ["Not Selected", "CSE", "IT", "CSBS", "DS"];
  const original = [
    "",
    "Computer Science and Engineering",
    "Information Technology",
    "Computer Science and Business Systems",
    "Applied Mathematics and Computational Science",
  ];

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageBack, setMessageBack] = useState("green");

  const [verify, setVerify] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [transactionNumber, setTransactionNumber] = useState("");
  const [disabledState, setDisabledState] = useState(false);
  const [isLogoutHovered, setLogoutHover] = useState(false);
  const [isVerifyHovered, setVerifyHovered] = useState(false);
  const [isVerifyLoading, setIsVerifyLoading] = useState(false);
  const [isSeeMoreHovered, setIsSeeMoreHovered] = useState(false);

  const mobileCheck = useMediaQuery("(min-width: 900px)");
  const router = useRouter();

  const verifyRequest = () => {
    if (profile?.paid) return "Payment Successful";
    if (!profile?.paid && profile?.transactionNumber?.trim() !== "") return "Requested for Verification";
    return "Not Verified";
  };

  const displayButton = () => (!mobileCheck && verifyRequest() === "Payment Successful");

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };

  // Fetch profile data using native fetch (cookies are sent automatically)
  useEffect(() => {
    setLoading(true);
    fetch("/api/profile/getProfile")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setTransactionNumber(data.transactionNumber || "");
        if (data.transactionNumber && data.transactionNumber.trim() !== "") {
          setDisabledState(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Profile fetch error:", err);
        router.push("/auth/login");
      });
  }, [verify]);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpen(false);
  };

  const handlePaymentSubmit = async () => {
    if (selectedIndex === 0) {
      setSnackbarOpen(true);
      setMessage("Select any one Department");
      setMessageBack("red");
    } else if (transactionNumber.trim() === "") {
      setSnackbarOpen(true);
      setMessage("Enter your Transaction Number");
      setMessageBack("red");
    } else {
      setIsVerifyLoading(true);
      setMessage("Submitting...");
      setMessageBack("green");
      try {
        const res = await fetch("/api/auth/complete-registration", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: profile.email,
            transactionNumber,
            selectedDepartment: original[selectedIndex],
          }),
        });
        if (!res.ok) throw new Error("Submission failed");
        setVerify(!verify);
        setMessage("Submitted");
        setMessageBack("green");
      } catch (err) {
        console.error(err);
        setMessage("Submission failed");
        setMessageBack("red");
      } finally {
        setIsVerifyLoading(false);
      }
    }
  };

  if (loading) return <MainLoader />;

  return (
    <div>
      <div className={`w-full ${mobileCheck ? "h-screen" : "h-fit"} flex ${mobileCheck ? "flex-row" : "flex-col"} justify-center items-center relative mb-10 overflow-x-hidden`}>
        <div className={`${mobileCheck ? "w-[50%]" : "w-[90%]"} h-full flex flex-col items-center justify-center`}>
          <nav className="w-full h-[50px] absolute top-5 left-5">
            <Link
              href="/"
              className="px-7 py-1 hover:text-white border-2 border-black rounded-md fixed md:block bg-white z-30"
              onMouseEnter={() => setIsSeeMoreHovered(true)}
              onMouseLeave={() => setIsSeeMoreHovered(false)}
            >
              Back
            </Link>
          </nav>
          <div className="flex items-start flex-col gap-8 mt-5">
            <h1 className={`${mobileCheck ? "text-8xl" : "text-4xl"} font-black ${mobileCheck ? "mt-0" : "mt-10"}`}>PROFILE</h1>
            {!mobileCheck && <Lottie options={defaultOptions} height={400} width={400} />}
            <table className="table-auto">
              <tbody>
                <tr>
                  <td className="font-semibold text-lg">Name:</td>
                  <td>{profile.fullName}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-lg">Department:</td>
                  <td>{profile.department}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-lg">College:</td>
                  <td>{profile.collegeName}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-lg">Phone:</td>
                  <td>{profile.phoneNumber}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-lg">Email:</td>
                  <td>{profile.email}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-lg">Payment Status:</td>
                  <td>{verifyRequest()}</td>
                </tr>
                <tr>
                  <td className="font-semibold pr-9 text-lg">Interested Department:</td>
                  <td>
                    {disabledState ? (
                      profile.selectedDepartment
                    ) : (
                      <div className="border-2 w-full rounded-lg inline py-2">
                        <ButtonGroup variant="outlined" ref={anchorRef} aria-label="Department selection">
                          <Button onClick={() => console.info(`You clicked ${options[selectedIndex]}`)}>{options[selectedIndex]}</Button>
                          <Button
                            size="small"
                            aria-controls={open ? "split-button-menu" : undefined}
                            aria-expanded={open ? "true" : undefined}
                            aria-label="select merge strategy"
                            aria-haspopup="menu"
                            onClick={handleToggle}
                          >
                            <ArrowDropDownIcon />
                          </Button>
                        </ButtonGroup>
                        <Popper sx={{ zIndex: 1 }} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                          {({ TransitionProps, placement }) => (
                            <Grow {...TransitionProps} style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}>
                              <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                  <MenuList id="split-button-menu" autoFocusItem>
                                    {options.map((option, index) => (
                                      <MenuItem key={option} selected={index === selectedIndex} onClick={(event) => handleMenuItemClick(event, index)}>
                                        {option}
                                      </MenuItem>
                                    ))}
                                  </MenuList>
                                </ClickAwayListener>
                              </Paper>
                            </Grow>
                          )}
                        </Popper>
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="font-semibold">** Workshop can be attended irrespective of the selected department</p>
            {mobileCheck && (
              <div>
                <button
                  onClick={async () => {
                    await fetch("/api/auth/logout");
                    router.push("/");
                  }}
                  className="px-7 py-1 hover:text-white border-2 border-black rounded-md"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={`${mobileCheck ? "w-[50%]" : "w-[90%]"} h-full flex flex-col items-center justify-center`}>
          {mobileCheck && (
            <div className="h-[400px]">
              <Lottie options={defaultOptions} height={400} width={400} />
            </div>
          )}
          {verifyRequest() !== "Payment Successful" && (
            <div>
              <div className="text-1xl mt-3 flex items-center font-bold">
                ** For Payment Details Download this file{" "}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                </svg>
                <Button sx={{ marginLeft: "10px" }} onClick={() => window.open("https://techutsav2024.blob.core.windows.net/eventdetails/Techutsav2024Paymentprocess.pdf")}>
                  <CloudDownloadIcon />
                </Button>
              </div>
              <div className="mt-3">
                <p>Please Enter your Transaction Number after Payment</p>
                <input
                  type="text"
                  className="mt-5 h-[30px] p-5 min-w-[200px] border"
                  placeholder="Transaction Number"
                  value={transactionNumber}
                  disabled={disabledState}
                  onChange={(event) => setTransactionNumber(event.target.value)}
                />
              </div>
              <div className="flex items-end flex-row justify-center gap-3 mt-5">
                <button
                  onClick={handlePaymentSubmit}
                  className="px-7 py-1 hover:text-white border-2 border-black rounded-md"
                  onMouseEnter={() => setVerifyHovered(true)}
                  onMouseLeave={() => setVerifyHovered(false)}
                >
                  Verify Payment
                </button>
                {isVerifyLoading && (
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                  </Box>
                )}
                {!mobileCheck && (
                  <div>
                    <button
                      onClick={async () => {
                        await fetch("/api/auth/logout");
                        router.push("/");
                      }}
                      className="px-7 py-1 hover:text-white border-2 border-black rounded-md"
                    >
                      Logout
                    </button>
                    <Link
                      href="/"
                      className="px-7 py-1 hover:text-white border-2 border-black rounded-md fixed md:block"
                      onMouseEnter={() => setIsSeeMoreHovered(true)}
                      onMouseLeave={() => setIsSeeMoreHovered(false)}
                    >
                      Back
                    </Link>
                  </div>
                )}
              </div>
              {verifyRequest() === "Requested for Verification" && (
                <p className="max-w-[400px] mt-[20px] text-[#FF1717]">
                  Your Verification request has been sent. Please wait for the admin to update your profile. If the profile is not updated within 36 Hours please contact using the number provided on the site.
                </p>
              )}
            </div>
          )}
          {displayButton() && (
            <div className="w-full mt-5">
              <button
                onClick={async () => {
                  await fetch("/api/auth/logout");
                  router.push("/");
                }}
                className="px-7 py-1 hover:text-white border-2 border-black rounded-md"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <SnackbarComponent open={snackbarOpen} message={message} messageBack={messageBack} setOpen={setSnackbarOpen} />
      <Footer />
    </div>
  );
};

export default Profile;
