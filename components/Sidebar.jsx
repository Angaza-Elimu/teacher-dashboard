import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// import { useDispatch } from "react-redux";

import logo from "../public/logo.png";
import Gear from "../assets/Gear";
import Exit from "../assets/Exit";
import Minimize from "../assets/Minimize";

import ChevronDown from "../assets/ChevronDown";
import ChevronUp from "../assets/ChevronUp";
import navs from "../config/navs";
// import Modal from "./Modal";
import Button from "./Button";
// import { getToken, logout, logoutApi } from "../api/auth";
// import { logout as logoutAction } from "../store/features/profileSlice";

function Sidebar({ onHide }) {
  const [visible, setVisible] = useState("");
  const [activeLink, setActiveLink] = useState();
  const [openModal, setOpenModal] = useState(false);
  const { pathname, push } = useRouter();
  // const token = getToken();
  // const dispatch = useDispatch();

  const preventNavCollapse = (e) => e.stopPropagation();

  const toggleVisibility = (name) => {
    setActiveLink(name);

    if (!visible) return setVisible(name);

    if (visible === name) return setVisible("");
    if (visible !== activeLink && visible === activeLink) return setVisible("");

    return setVisible(name);
  };

  const handleLogout = () => {
    // setOpenModal(false);
    // try {
    //   logoutApi(token);
    //   logout();
    //   dispatch(logoutAction());
    //   push("/");
    // } catch (error) {}
  };

  useEffect(() => {
    if (pathname.split("/").length >= 2)
      toggleVisibility(
        pathname.split("/")[1].charAt(0).toUpperCase() + pathname.split("/")[1].substring(1)
      );
  }, []);

  return (
    <>
      <nav className="flex flex-col h-full select-none">
        <Link passHref href="/home" className="mt-10 outline-none">
          <div className="relative h-10 w-10/12 mx-auto">
            <Image src={logo} fill alt="logo" />
          </div>
        </Link>

        <div className="flex-1 w-full mx-auto  text-neutral-500 text-lg font-medium gap-3 flex flex-col justify-start mt-10 transition-all duration-200 ease-in-out">
          {Object.values(navs).map((nav, i) => {
            if (!nav.inner)
              //standalone navigation
              return (
                <Link
                  href={nav.url}
                  passHref
                  key={i}
                  className={`p-2 hover:bg-[#F1FAFD] hover:text-primary-600 duration-200 transition-all ease-out ${
                    "/" + pathname.split("/")[1] === nav.url &&
                    "bg-[#F1FAFD] text-primary-700 border-r-4 border-r-primary-700"
                  }`}
                >
                  <div className="flex gap-4 justify-start pl-6 items-center ">
                    <nav.component className="stroke-current" />
                    <p className="flex-1">{nav.name}</p>
                  </div>
                </Link>
              );

            //nested navigation
            return (
              <div
                className="py-2 rounded-lg duration-200 transition-all ease-out"
                key={i}
                onClick={() => toggleVisibility(nav.name)}
              >
                <div
                  className={`flex gap-3 justify-start pl-8 items-center cursor-pointer stroke-current mr-3 ${
                    nav.name === visible && "text-primary-700 stroke-primary-700"
                  }`}
                >
                  <nav.component />
                  <p className="flex-1">{nav.name}</p>
                  {nav.name === visible ? <ChevronUp /> : <ChevronDown />}
                </div>

                <div
                  className={`${nav.name === visible ? "" : "hidden "} mt-4 flex flex-col gap-2`}
                >
                  {nav.innerNavs.map((innerNav, i) => {
                    return (
                      <Link
                        passHref
                        href={innerNav.url}
                        key={i}
                        className="w-full hover:bg-[#F1FAFD] hover:text-primary-600 rounded-md"
                        onClick={(e) => preventNavCollapse(e)}
                      >
                        <div
                          className={`flex gap-3 items-center self-end p-3 py-2 transition-all duration-200 ease-out pl-14 ${
                            pathname.match(innerNav.url) &&
                            "bg-[#F1FAFD] text-primary-700 border-r-4 border-r-primary-700"
                          }`}
                        >
                          <innerNav.component className="stroke-current" />
                          <p>{innerNav.name}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-neutral-800 p-5 py-2">
          <div className="flex justify-between">
            <div className="flex gap-3">
              {/* <Avatar className="cursor-pointer" /> */}
              <Link href="/settings" passHref>
                <Gear
                  className={`cursor-pointer hover:stroke-primary-600 transition-all duration-200 ease-out ${
                    pathname.split("/")[1] === "settings"
                      ? "stroke-primary-600"
                      : "stroke-neutral-500"
                  }`}
                />
              </Link>
              <Exit
                className="cursor-pointer stroke-neutral-500 hover:stroke-primary-600 transition-all duration-200 ease-out"
                onClick={() => setOpenModal(true)}
              />
            </div>

            <div className="" onClick={() => onHide(true)}>
              <Minimize className="cursor-pointer stroke-neutral-500 hover:stroke-primary-600 transition-all duration-200 ease-out" />
            </div>
          </div>
        </div>
      </nav>

      {/* <Modal isOpen={openModal}>
        <div className="flex flex-col">
          <div className="flex flex-col justify-start gap-5 mb-5">
            <div className="relative mx-auto h-16 w-16">
              <Image src={"/images/hexagon.svg"} layout="fill" alt="" />
            </div>

            <h3 className="font-bold text-center text-primary-500">Log out</h3>
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-center text-neutral-500 text-sm">
              You&apos;re about to be logged out
            </p>

            <div className="flex items-center justify-between gap-5">
              <Button
                name="Cancel"
                type="SECONDARY"
                className="w-full py-1.5 !text-primary-700 hover:!text-shade-light outline-none"
                onClick={() => setOpenModal(false)}
              />
              <Button name="Confirm" className="w-full py-1.5" onClick={handleLogout} />
            </div>
          </div>
        </div>
      </Modal> */}
    </>
  );
}

export default Sidebar;
