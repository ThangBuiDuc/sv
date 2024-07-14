import "./App.css";
import Header from "./hardComponent/header";
import Footer from "./hardComponent/footer";
import SideBar from "./hardComponent/sideBar";
import {
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
// import { useAuth } from "@clerk/clerk-react";
import React, {
  Suspense,
  useState,
  createContext,
  useLayoutEffect,
} from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useUser,
} from "@clerk/clerk-react";
import ReactLoading from "react-loading";

//SignIn
import SignIn from "./hardComponent/signIn";

//SignUp
import SignUp from "./hardComponent/signUp";

//ForgotPass
import ResetPass from "./hardComponent/resetPass";

// Navigation bar
const Announcement = React.lazy(() => import("./Component/announcement"));
const QandA = React.lazy(() => import("./Component/Q&A"));
const HomePage = React.lazy(() => import("./Component/homePage"));
// Hoc tap
const Program = React.lazy(() => import("././Component/study/program"));
const AVG = React.lazy(() => import("././Component/study/avg"));
const Owe = React.lazy(() => import("././Component/study/owe"));
// const Graduation = React.lazy(() => import("./Component/study/graduation"));
// const Scholarship = React.lazy(() => import("./Component/study/scholarship"));
const Score = React.lazy(() => import("./Component/study/score"));
const TrainScore = React.lazy(() => import("./Component/study/trainScore"));
const Warning = React.lazy(() => import("./Component/study/warning"));
// Tai chinh
const Submitted = React.lazy(() => import("./Component/money/submitted"));
const UnSubmitted = React.lazy(() => import("./Component/money/unSubmitted"));
const Subject = React.lazy(() => import("./Component/money/subject"));
// const UnSubmittedSubSession = React.lazy(() =>
//   import("./Component/money/unSubmittedSubSession")
// );
// const Dormitory = React.lazy(() => import("./Component/money/dormitory"));
// So yeu ly lich
const UserInfor = React.lazy(() =>
  import("./Component/resume/userInformation")
);
const Major = React.lazy(() => import("./Component/resume/major"));
const Family = React.lazy(() => import("./Component/resume/family"));
const Paper = React.lazy(() => import("./Component/resume/paper"));
// Lich
const CalendarStudy = React.lazy(() => import("./Component/calendar/study"));
const CalendarTest = React.lazy(() => import("./Component/calendar/test"));

//Thu vien
const LibrarySearch = React.lazy(() => import("./Component/library/search"));

//Khao Sat
const SubjectSurvey = React.lazy(() =>
  import("./Component/survey/subjectSurvey")
);

// const UserInfor = React.lazy(() => import("./Component/userInformation/index"));

export const StatusMobileNav = createContext();

function Hard() {
  const { user } = useUser();
  if (user && user.emailAddresses[0].emailAddress.includes("@hpu.edu.vn"))
    window.location.href = "https://gv.hpu.edu.vn/home";
  return (
    <>
      <Header />
      <div style={{ display: "flex" }} className={"wrapbody"}>
        <SideBar />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

function ClerkProviderWithRoutes({ location }) {
  // const { getToken } = useAuth();
  // const client = createApolloClient(getToken);
  return (
    <Routes>
      {/* <Route path="/login" element={<Login />} /> */}
      <Route
        path="/sign-in"
        element={
          <>
            <SignedIn>
              <Suspense fallback={<></>}>
                {location.hash === "" ? (
                  <Navigate to="/home" replace />
                ) : (
                  <Navigate
                    to={decodeURIComponent(
                      location.hash.substring(16, location.hash.length)
                    )}
                    replace
                  />
                )}
              </Suspense>
            </SignedIn>
            <SignedOut>
              <SignIn />
            </SignedOut>
          </>
        }
      />
      <Route
        path="/sign-up"
        element={
          <>
            <SignedIn>
              <Navigate to="/home" replace />
            </SignedIn>
            <SignedOut>
              <SignUp />
            </SignedOut>
          </>
        }
      />
      <Route
        path="/reset-password"
        element={
          <>
            <SignedIn>
              <Suspense
                fallback={
                  <div className="loading">
                    <ReactLoading
                      type="spin"
                      color="#0083C2"
                      width={"50px"}
                      height={"50px"}
                    />
                  </div>
                }
              >
                <ResetPass />
              </Suspense>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />
      <Route path="/" element={<Hard />}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="/home"
          element={
            <Suspense
              fallback={
                <div className="loading">
                  <ReactLoading
                    type="spin"
                    color="#0083C2"
                    width={"50px"}
                    height={"50px"}
                  />
                </div>
              }
            >
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="/announcement"
          element={
            <Suspense
              fallback={
                <div className="loading">
                  <ReactLoading
                    type="spin"
                    color="#0083C2"
                    width={"50px"}
                    height={"50px"}
                  />
                </div>
              }
            >
              <Announcement />
            </Suspense>
          }
        />
        <Route
          path="/qanda"
          element={
            <>
              <SignedIn>
                <Suspense
                  fallback={
                    <div className="loading">
                      <ReactLoading
                        type="spin"
                        color="#0083C2"
                        width={"50px"}
                        height={"50px"}
                      />
                    </div>
                  }
                >
                  <QandA />
                </Suspense>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        {/*Resume*/}
        <Route
          path="/resume"
          element={<Navigate to="/resume/userinformation" replace />}
        />

        <Route
          path="/resume/userinformation"
          element={
            <>
              <SignedIn>
                <Suspense
                  fallback={
                    <div className="loading">
                      <ReactLoading
                        type="spin"
                        color="#0083C2"
                        width={"50px"}
                        height={"50px"}
                      />
                    </div>
                  }
                >
                  <UserInfor />
                </Suspense>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/resume/major"
          element={
            <>
              <SignedIn>
                <Suspense
                  fallback={
                    <div className="loading">
                      <ReactLoading
                        type="spin"
                        color="#0083C2"
                        width={"50px"}
                        height={"50px"}
                      />
                    </div>
                  }
                >
                  <Major />
                </Suspense>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/resume/family"
          element={
            <>
              <SignedIn>
                <Suspense
                  fallback={
                    <div className="loading">
                      <ReactLoading
                        type="spin"
                        color="#0083C2"
                        width={"50px"}
                        height={"50px"}
                      />
                    </div>
                  }
                >
                  <Family />
                </Suspense>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/resume/paper"
          element={
            <>
              <SignedIn>
                <Suspense
                  fallback={
                    <div className="loading">
                      <ReactLoading
                        type="spin"
                        color="#0083C2"
                        width={"50px"}
                        height={"50px"}
                      />
                    </div>
                  }
                >
                  <Paper />
                </Suspense>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        {/* Study */}
        <Route
          path="/study/program"
          element={
            <>
              <SignedIn>
                <Suspense
                  fallback={
                    <div className="loading">
                      <ReactLoading
                        type="spin"
                        color="#0083C2"
                        width={"50px"}
                        height={"50px"}
                      />
                    </div>
                  }
                >
                  <Program />
                </Suspense>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/study/avg"
          element={
            <>
              <SignedIn>
                <Suspense
                  fallback={
                    <div className="loading">
                      <ReactLoading
                        type="spin"
                        color="#0083C2"
                        width={"50px"}
                        height={"50px"}
                      />
                    </div>
                  }
                >
                  <AVG />
                </Suspense>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/study/owe"
          element={
            <>
              <SignedIn>
                <Suspense
                  fallback={
                    <div className="loading">
                      <ReactLoading
                        type="spin"
                        color="#0083C2"
                        width={"50px"}
                        height={"50px"}
                      />
                    </div>
                  }
                >
                  <Owe />
                </Suspense>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/study/score"
          element={
            <>
              <SignedIn>
                <Suspense
                  fallback={
                    <div className="loading">
                      <ReactLoading
                        type="spin"
                        color="#0083C2"
                        width={"50px"}
                        height={"50px"}
                      />
                    </div>
                  }
                >
                  <Score />
                </Suspense>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/study/trainscore"
          element={
            <>
              <SignedIn>
                <Suspense
                  fallback={
                    <div className="loading">
                      <ReactLoading
                        type="spin"
                        color="#0083C2"
                        width={"50px"}
                        height={"50px"}
                      />
                    </div>
                  }
                >
                  <TrainScore />
                </Suspense>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        {/* <Route
         path="/study/scholarship"
         element={
           <Suspense fallback={<></>}>
             {isSignedIn ? <Scholarship /> : <Navigate to="/sign-in" replace />}
           </Suspense>
         }
       /> */}

        <Route
          path="/study/warning"
          element={
            <>
              <SignedIn>
                <Suspense
                  fallback={
                    <div className="loading">
                      <ReactLoading
                        type="spin"
                        color="#0083C2"
                        width={"50px"}
                        height={"50px"}
                      />
                    </div>
                  }
                >
                  <Warning />
                </Suspense>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        {/* <Route
         path="/study/graduation"
         element={
           <Suspense fallback={<></>}>
             {isSignedIn ? <Graduation /> : <Navigate to="/sign-in" replace />}
           </Suspense>
         }
       /> */}

        {/* Money */}
        <Route
          path="/money/submitted"
          element={
            <>
              <SignedIn>
                <Suspense
                  fallback={
                    <div className="loading">
                      <ReactLoading
                        type="spin"
                        color="#0083C2"
                        width={"50px"}
                        height={"50px"}
                      />
                    </div>
                  }
                >
                  <Submitted />
                </Suspense>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/money/unSubmitted"
          element={
            <>
              <SignedIn>
                <Suspense
                  fallback={
                    <div className="loading">
                      <ReactLoading
                        type="spin"
                        color="#0083C2"
                        width={"50px"}
                        height={"50px"}
                      />
                    </div>
                  }
                >
                  <ApolloProvider client={client}>
                    <UnSubmitted />
                  </ApolloProvider>
                </Suspense>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/money/subject"
          element={
            <>
              <SignedIn>
                <Suspense
                  fallback={
                    <div className="loading">
                      <ReactLoading
                        type="spin"
                        color="#0083C2"
                        width={"50px"}
                        height={"50px"}
                      />
                    </div>
                  }
                >
                  <Subject />
                </Suspense>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        {/* Calendar */}
        <Route
          path="/calendar/study"
          element={
            <>
              <SignedIn>
                <Suspense
                  fallback={
                    <div className="loading">
                      <ReactLoading
                        type="spin"
                        color="#0083C2"
                        width={"50px"}
                        height={"50px"}
                      />
                    </div>
                  }
                >
                  <CalendarStudy />
                </Suspense>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/calendar/test"
          element={
            <>
              <SignedIn>
                <Suspense
                  fallback={
                    <div className="loading">
                      <ReactLoading
                        type="spin"
                        color="#0083C2"
                        width={"50px"}
                        height={"50px"}
                      />
                    </div>
                  }
                >
                  <CalendarTest />
                </Suspense>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        {/* library */}
        {/* <Route
          path="/library/search"
          element={
            <>
              <SignedIn>
                <Suspense
                  fallback={
                    <div className="loading">
                      <ReactLoading
                        type="spin"
                        color="#0083C2"
                        width={"50px"}
                        height={"50px"}
                      />
                    </div>
                  }
                >
                  <LibrarySearch />
                </Suspense>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        /> */}

        {/* Survey */}
        <Route
          path="/survey/subjectSurvey"
          element={
            <>
              <SignedIn>
                <Suspense
                  fallback={
                    <div className="loading">
                      <ReactLoading
                        type="spin"
                        color="#0083C2"
                        width={"50px"}
                        height={"50px"}
                      />
                    </div>
                  }
                >
                  <SubjectSurvey />
                </Suspense>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        {/* <SignedOut>
       <RedirectToSignIn />
       </SignedOut> */}
      </Route>
    </Routes>
  );
}

function App() {
  const navigate = useNavigate();
  const [statusMenu, setStatusMenu] = useState(false);
  const location = useLocation();
  useLayoutEffect(() => {
    document.body.style.overflow = "unset";
    setStatusMenu(false);
  }, [location.pathname]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
        className="toast"
      />
      <StatusMobileNav.Provider value={{ statusMenu, setStatusMenu }}>
        <ClerkProvider
          publishableKey={import.meta.env.VITE_APP_CLERK_PUBLISHABLE_KEY}
          navigate={(to) => navigate(to)}
        >
          <ClerkProviderWithRoutes location={location} />
        </ClerkProvider>
      </StatusMobileNav.Provider>
    </div>
  );
}

export default App;
