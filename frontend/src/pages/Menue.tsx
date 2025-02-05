import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation.tsx";

const Menu = () => {
  const items = [
    {
      id: 1,
      name: "MOMO",
      price: "$15",
      description: "Here we have a best momo",
    },
    {
      id: 2,
      name: "Dal Bhat Tarkari",
      price: "$22",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 3,
      name: "Pulau",
      price: "$18",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 4,
      name: "Natural Wine Pairing",
      price: "$90",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  const offer = [
    {
      id: 1,
      img: "/image/fish.png",
      name: "Premium Quality",
      description: "We offer a very high quality food with a fresh product.",
    },
    {
      id: 2,
      img: "/image/carrot.png",
      name: "Seasonal Vegetables",
      description: "We have all season food we fill you all kind of craving.",
    },
    {
      id: 3,
      img: "/image/Lemon.png",
      name: "Fresh Food",
      description: "We have all season food we fill you all kind of craving.",
    },
  ];

  //reservation
  const [reservation, setReservation] = useState({
    date: "10/12/2024",
    time: "6:00pm",
    people: "2person",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation({
      ...reservation,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(reservation); // Handle the reservation submission
    // e.g., Make an API call or send the data to a server
  };
  return (
    <>
      <Navigation />
      <div className="describtion  h-[30rem] bg-lightGray  text-black   text-xl">
        <div className=" flex h-[5rem] ml-4">
          <div className="menueSection relative w-1/2 h-full  ">
            <h1 className="section1 rufinaB font-bold text-3xl">Our Menue</h1>
            <p className="section2">Here is our famous food .</p>
          </div>
          <div className="image  w-1/2 h-full flex justify-end items-start">
            <img
              src="/image/imageLeaf.png"
              alt="picture of leaf"
              className="size-96  right-[10px] "
            ></img>
          </div>
        </div>
        <div className="max-w-5xl ml-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="border-b border-dotted border-gray-400 pb-4 mt-20 flex items-start"
            >
              <div className="flex-col justify-between w-full items-center">
                <h3 className="text-lg font-bold">{item.name}</h3>

                <p className="text-sm text-gray-600 mt-2">{item.description}</p>
              </div>
              <span className="text-lg font-bold  items-center">
                {item.price}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between h-3/5 bg-olive ">
        <div className="h-full">
          <img
            src="/image/manworking.jpg"
            alt="Decorative leaf"
            className="h-full w-auto object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="mt-8 lg:mt-0 lg:ml-8 text-center lg:text-left">
          <h1 className="text-3xl font-bold text-gray-800">Excellent Cook</h1>
          <p className="text-gray-600 mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus lorem
            id penatibus blandit at purus auctor tincidunt lacus.
          </p>
          <div className="secondLeaf">
            <img
              src="/image/Leaf2.png"
              alt="second leaf"
              className="absolute right-20 h-40 w-60"
            />
          </div>
        </div>
      </div>
      <div className="offer"></div>
      {/* Offer Section */}
      <div className="offer bg-lightGray py-12">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
          What We Offer
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {offer.map((off) => (
            <div
              key={off.id}
              className="bg-white  rounded-lg shadow-lg flex flex-col items-center text-center"
            >
              <img
                src={off.img}
                alt={off.name}
                className="h-24 w-24 object-cover mb-4"
              />
              <h1 className="text-lg  text-black font-bold">{off.name}</h1>

              <p className="text-gray-600 mt-2">{off.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="reservation bg-olive  h-[30rem] object-cover flex-wrap ">
        <h1 className="text-background text-4xl text-center rufinaB pt-20 ">
          Make a Reservation
        </h1>
        <h5 className="text-background text-center text-xs font-rufinar">
          Get in touch with restaurant
        </h5>
        <div className="inputSection  ">
          <form
            onSubmit={handleSubmit}
            className="m-6 flex justify-between gap-4 mt-20"
          >
            <input
              className=" border border-background w-1/2 h-12 "
              name="date"
              value={reservation.date}
              onChange={handleChange}
            />
            <input
              className="myInput border border-background w-1/2"
              name="time"
              value={reservation.time}
              onChange={handleChange}
            />
            <input
              className="myInput border border-background w-1/2"
              name="people"
              value={reservation.people}
              onChange={handleChange}
            />
          </form>
          <button
            type="submit"
            className="text-white block mx-auto mt-24   bg-background text-center justify-center text-lg font-bold rufinaB px-8 py-4 "
          >
            Book Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Menu;
