import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-screen pt-16 overflow-hidden">
      <div className="max-w-md mx-auto p-6">
        <div className="bg-base-300 rounded-xl p-5 space-y-6">
          <div className="text-center">
            <h1 className="text-xl font-semibold">Profile</h1>
            <p className="text-sm text-base-content/70">Your profile information</p>
          </div>

          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-base-content"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-base-content/70">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Profile Info Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm text-base-content/70 flex items-center gap-2">
                <User className="w-5 h-5" />
                Full Name
              </div>
              <p className="px-4 py-2 bg-base-200 rounded-lg border text-sm">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-base-content/70 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Email Address
              </div>
              <p className="px-4 py-2 bg-base-200 rounded-lg border text-sm">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account Info Section */}
          <div className="bg-base-200 rounded-lg p-4">
            <h2 className="text-base font-medium mb-3">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-1 border-b border-base-content/20">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
