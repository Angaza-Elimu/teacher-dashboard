import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";

import { getToken, newPassword as newPasswordApi } from "../api/auth";
import Button from "../components/Button";
import Layout from "../components/Layout";
import Input from "../components/Input";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import Notification from "../components/Notification";
import profileImage from "../assets/images/avatar.png";

export default function SettingsPage() {
  const router = useRouter();
  const { profile } = useSelector((state) => state.profile);
  const token = getToken();

  const [isOpen, setIsOpen] = useState(false);
  const [firstname, setFirstname] = useState(profile?.firstname || "");
  const [lastname, setLastname] = useState(profile?.lastname || "");
  const [email, setEmail] = useState(profile?.email || "");
  const [phone, setPhone] = useState(profile?.phone || "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [profilePicBase64, setProfilePicBase64] = useState("");

  const closeModal = () => {
    resetForm();
    setIsOpen(false);
  };
  const openModal = () => setIsOpen(true);

  const resetForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const handleChangePassword = async () => {
    setSubmitting(true);
    setLoading(true);
    setLoadingMessage("We are saving your changes");

    const changePasswordData = {
      old_password: currentPassword,
      new_password: newPassword,
      confirm_password: confirmNewPassword,
    };

    try {
      const { data, status } = await newPasswordApi({ ...changePasswordData }, token);
      if (status !== 200)
        return toast(<Notification message="An error occurred, please retry." type="danger" />);

      if (data.status === 400) return toast(<Notification message={data.message} type="danger" />);

      closeModal();
      toast(<Notification message={data.message} type="success" />);

      // reset the form
      resetForm();
    } catch (error) {
      toast(<Notification message="An error occurred, please retry." type="danger" />);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  // const handleImageChange = (e) => {
  //   let reader = new FileReader();
  //   reader.onload = function () {
  //     setProfilePicBase64(reader.result);
  //   };
  //   reader.readAsDataURL(e.target.files[0]);
  // };

  useEffect(() => {
    setValidPassword(
      !isEmpty(newPassword) && confirmNewPassword.length > 0
        ? newPassword == confirmNewPassword
        : true
    );
    return () => {};
  }, [newPassword, confirmNewPassword]);

  return (
    <Layout title="Settings">
      <Loading isOpen={loading} subtitle={loadingMessage} />
      <div className="relative flex-1 flex">
        <div className="px-5 flex flex-1 flex-col">
          <div className="flex gap-5 items-center">
            <Link passHref href="/settings">
              <div className="bg-primary-900 rounded-md font-medium text-primary-600 px-4 py-2 cursor-pointer">
                <p>My Profile</p>
              </div>
            </Link>
          </div>

          <div className="flex flex-col gap-10 flex-1 h-full">
            <div className="bg-light flex gap-16 mt-16 py-9 px-10 rounded-xl items-center">
              <div className="relative h-40 w-40">
                <Image
                  src={profilePicBase64 ? profilePicBase64 : profileImage}
                  fill
                  className="rounded-full"
                  alt="profile picture"
                />

                {/* <label
                  className="absolute bg-alerts-info rounded-full p-2 right-0 bottom-0 h-11 w-11 cursor-pointer"
                  htmlFor="imageUpload"
                >
                  <input
                    type="file"
                    className="hidden"
                    id="imageUpload"
                    accept=".png, .jpg, .jpeg"
                    // onChange={handleImageChange}
                  /> */}
                {/* <Camera /> */}
                {/* </label> */}
              </div>

              <div className="grid grid-cols-2 p-3 flex-1 ml-5 gap-8 gap-y-4">
                <Input
                  disabled
                  label={"First Name"}
                  onChange={(e) => setFirstname(e.target.value)}
                  value={firstname}
                />
                <Input
                  disabled
                  label={"Last Name"}
                  onChange={(e) => setLastname(e.target.value)}
                  value={lastname}
                />
                <Input
                  disabled
                  label={"Email Address"}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  value={email}
                />
                <Input
                  disabled
                  label={"Phone Number"}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  value={phone}
                />
              </div>
            </div>

            <div className="rounded-xl p-5 bg-light flex flex-col w-1/3 gap-10">
              <div className="">
                <p className="font-bold text-2xl">Change password</p>
                <p className="text-neutral-500">Your password must be more that six characters</p>
              </div>

              <div>
                <Button
                  name="Change Password"
                  type="SECONDARY"
                  className={"py-2 px-4 text-base"}
                  onClick={() => openModal()}
                />
              </div>
            </div>

            <div className="content-end flex items-center justify-end mt-auto">
              <div className="flex gap-8 pb-5">
                <Button name="Cancel" onClick={() => router.back()} type="SECONDARY" />
                <Button
                  name="Save Changes"
                  onClick={() => {
                    setLoadingMessage("We are saving your changes");
                    setLoading(true);

                    setTimeout(() => {
                      setLoading(false);
                    }, 1200);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <Modal isOpen={isOpen} title="Change Password" subtitle="Provide your new password below">
          <div className="my-6 space-y-6">
            <Input
              label="Current Password"
              labelBackgroundColor="bg-[#ffffff]"
              type="password"
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              label="New Password"
              labelBackgroundColor="bg-[#ffffff]"
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              label="Confirm Password"
              labelBackgroundColor="bg-[#ffffff]"
              type="password"
              placeholder="••••••••"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />

            {!validPassword && (
              <p className="!my-2 text-sm text-alerts-danger-500">Passwords must be same</p>
            )}
          </div>

          <div className="mt-8 flex justify-between">
            <Button type="SECONDARY" name="Cancel" onClick={closeModal} />
            <Button
              disabled={
                !currentPassword ||
                !newPassword ||
                !confirmNewPassword ||
                newPassword !== confirmNewPassword ||
                submitting
              }
              name="Submit"
              onClick={() => handleChangePassword()}
            />
          </div>
        </Modal>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ req, query }) => {
  const token = req.cookies.token;
  //redirect to login if not authenticated
  if (!token) return { redirect: { destination: "/" } };

  // get the profile of the user on the server
  return {
    props: {},
  };
};
