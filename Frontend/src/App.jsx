import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login"
import CreateAccount from "./components/CreateAccount";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/AdminDashboard";
import UserInfo from "./components/UserInfo";
import UserHome from "./components/UserHome";
import AdminHome from "./components/AdminHome";
import LandingPage from "./components/LandingPage";
import Profile from "./components/Profile";
import BookingPage from "./components/BookingPage.tsx";
import Payment from "./components/Payment";
import PaymentSuccess from "./components/PaymentSuccess"
import AdminBookings from "./components/AdminBookings";
import AdminMovieView from "./components/AdminMovieView";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMoviesStart, fetchMoviesSuccess } from "./store/slices/moviesSlice";
import moviesData from "./components/MoviesData";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMoviesStart());
    dispatch(fetchMoviesSuccess(moviesData));
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="min-h-screen flex items-center justify-center">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/admin-dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/user-info" element={<UserInfo />} />
          <Route path="/user-home" element={<ProtectedRoute><UserHome /></ProtectedRoute>} />
          <Route path="/admin-home" element={<ProtectedRoute role="admin"><AdminHome /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/booking-page" element={<BookingPage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/admin-bookings" element={<AdminBookings />} />
          <Route path="/admin-movie-view/:movieId" element={<AdminMovieView />} />
        </Routes></div>
    </BrowserRouter>
  );
}
export default App;










/*import { useState } from "react";

function Square({value,onSquareClick}) {
 
  return (
    <button
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default function App() {
  const [ xIsNext , setXIsNext]= useState(true);
  const [ squares, setSquares]= useState(Array(9).fill(null));

  function handleClick(i){
    if(squares[i]|| calculateWinner(squares)){
      return;
    }
    const nextSquares = squares.slice();
    if(xIsNext){
    nextSquares[i]='X';
    }else{
      nextSquares[i]='O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext)
  }
  const winner= calculateWinner(squares);
  let status;
  if(winner){
    status="Winner:"+winner;
  }else{
    status="Next Player: "+(xIsNext ? "X":"O");
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={()=>handleClick(0)} />
        <Square value={squares[1]} onSquareClick={()=>handleClick(1)} />
        <Square value={squares[2]} onSquareClick={()=>handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={()=>handleClick(3)} />
        <Square value={squares[4]} onSquareClick={()=>handleClick(4)} />
        <Square value={squares[5]} onSquareClick={()=>handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={()=>handleClick(6)} />
        <Square value={squares[7]} onSquareClick={()=>handleClick(7)} />
        <Square value={squares[8]} onSquareClick={()=>handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares){
  const lines=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
  ];
  for(let i=0; i<lines.length;i++){
    const [a,b,c]=lines[i];
    if(squares[a]&&squares[a]===squares[b]&&squares[a]===squares[c]){
      return squares[a];
    }
  }
  return null;
}*/
