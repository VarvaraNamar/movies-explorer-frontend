import React, { useState, useEffect } from "react"
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import Main from "../Main/Main"
import Register from "../Register/Register"
import Login from "../Login/Login"
import Profile from "../Profile/Profile"
import Movies from "../Movies/Movies"
import SavedMovies from "../SavedMovies/SavedMovies"
import InfoTooltip from "../InfoTooltip/InfoTooltip"
import InfoTooltipUpdate from "../InfoTooltipUpdate/InfoTooltipUpdate"
import NotFound from "../NotFound/NotFound"
import "./App.css"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"
import * as api from "../../utils/MainApi"

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [savedMovies, setSavedMovies] = useState([])
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false)
  const [isInfoToolTipUpdatePopupOpen, setInfoToolTipUpdatePopupOpen] =
    useState(false)
  const [infoToolTipText, setinfoToolTipText] = useState("");

  const location = useLocation()
  const path = location.pathname
  const navigate = useNavigate()

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      api
        .getContent(jwt)
        .then((res) => {
          if (res) {
            localStorage.removeItem("allMovies")
            setLoggedIn(true)
          }
          navigate(path)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((userData) => {
          setCurrentUser(userData)
        })
        .catch((err) => {
          console.log(err)
        })
      api
        .getMovies()
        .then((cardsData) => {
          setSavedMovies(cardsData.reverse())
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [loggedIn])

  function handleRegistration({ name, email, password }) {
    api
      .registration(name, email, password)
      .then(() => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(true)
        handleLogin({ email, password })
        setinfoToolTipText("Вы успешно зарегистрировались!")
      })
      .catch((err) => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(false)
      })
  }

  function handleLogin({ email, password }) {
    setIsLoading(true)
    api
      .authorization(email, password)
      .then((res) => {
        if (res) {
          setInfoToolTipPopupOpen(true)
          setIsSuccess(true)
          setinfoToolTipText("Вы успешно вошли!") 
          localStorage.setItem("jwt", res.token)
          navigate("/movies", { replace: true })
          setLoggedIn(true)
        }
      })
      .catch((err) => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(false)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleUpdateUser(newUserData) {
    setIsLoading(true)
    api
      .editUserInfo(newUserData)
      .then((data) => {
        setInfoToolTipUpdatePopupOpen(true)
        setIsUpdate(true)
        setCurrentUser(data)
      })
      .catch((err) => {
        setInfoToolTipUpdatePopupOpen(true)
        setIsUpdate(false)
        console.log(err)
        handleUnauthorizedError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
    
  function handleMovieLike(card) {
    api
      .addNewMovie(card)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies])
      })
      .catch((err) => {
        setIsSuccess(false)
        console.log(err)
        handleUnauthorizedError(err)
      })
  }
    function handleMovieDelete(card) {
      api
        .deleteMovie(card._id)
        .then(() => {
          setSavedMovies((state) => state.filter((item) => item._id !== card._id))
        })
        .catch((err) => {
          setIsSuccess(false)
          console.log(err)
          handleUnauthorizedError(err)
        })
    }

  function handleUnauthorizedError(err) {
    if (err === "Error: 401") {
      onSignOut()
    }
  }
 
  const isOpen = isInfoToolTipPopupOpen || isInfoToolTipUpdatePopupOpen

  const onSignOut = () => {
    setLoggedIn(false)
    localStorage.removeItem("jwt")
    localStorage.removeItem("movies")
    localStorage.removeItem("allMovies")
    localStorage.removeItem("shortMovies")
    localStorage.removeItem("movieSearch")
    localStorage.clear()
    navigate("/")
  }

  function closeAllPopups() {
    setInfoToolTipPopupOpen(false)
    setInfoToolTipUpdatePopupOpen(false)
  }

  function closePopupByOverlay(event) {
    if (event.target === event.currentTarget) {
      closeAllPopups()
    }
  }
  useEffect(() => {
    function closePopupByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups()
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closePopupByEscape)
      return () => {
        document.removeEventListener("keydown", closePopupByEscape)
      }
    }
  }, [isOpen])

  const getShowHeader = () => {
    const { pathname } = location
    return (
      pathname === "/" ||
      pathname === "/movies" ||
      pathname === "/saved-movies" ||
      pathname === "/profile"
    )
  }

  const getShowFooter = () => {
    const { pathname } = location
    return pathname === "/"
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__wrapper">
        {getShowHeader() && <Header loggedIn={loggedIn}/>}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={
                <ProtectedRoute
                  path="/movies"
                  component={Movies}
                  loggedIn={loggedIn}
                  handleLikeFilm={handleMovieLike}
                  savedMovies={savedMovies}
                  onDeleteCard={handleMovieDelete}
                />
              } />
          <Route path="/saved-movies" element={
                <ProtectedRoute
                  path="/saved-movies"
                  component={SavedMovies}
                  loggedIn={loggedIn}
                  savedMovies={savedMovies}
                  onDeleteCard={handleMovieDelete}
                />
              } />
          <Route path="/profile" element={
                <ProtectedRoute
                  path="/profile"
                  component={Profile}
                  isLoading={isLoading}
                  signOut={onSignOut}
                  onUpdateUser={handleUpdateUser}
                  loggedIn={loggedIn}
                />
              } />
          <Route path="/signup" element={
                loggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Register
                    onRegister={handleRegistration}
                    isLoading={isLoading}
                  />
                )
              } />
          <Route path="/signin" element={
                loggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Login
                    onAuthorization={handleLogin}
                    isLoading={isLoading}
                  />
                )
              } />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {getShowFooter() && <Footer />}
        <InfoTooltip
            isOpen={isInfoToolTipPopupOpen}
            isSuccess={isSuccess}
            onClose={closeAllPopups}
            onCloseOverlay={closePopupByOverlay}
            text={infoToolTipText}
          />
          <InfoTooltipUpdate
            isOpen={isInfoToolTipUpdatePopupOpen}
            isUpdate={isUpdate}
            onClose={closeAllPopups}
            onCloseOverlay={closePopupByOverlay}
          />
      </div>
    </div>
    </CurrentUserContext.Provider>
  )
}

export default App
