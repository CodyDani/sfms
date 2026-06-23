import { useEffect, useState } from "react";
import { getProfile, updateProfile, changePassword } from "../api/profile";

export default function Profile() {
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
  });
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getProfile();

      setProfile(response.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await updateProfile(profile);

      setMessage(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      const response = await changePassword(passwordData);

      setMessage(response.message);

      setPasswordData({
        current_password: "",
        new_password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>

      {message && (
        <div
          className="
        bg-green-100
        text-green-700
        p-3
        rounded-lg
      "
        >
          {message}
        </div>
      )}

      {/* User Avatar */}

      <div
        className="
      bg-white
      border
      rounded-xl
      p-6
      flex
      items-center
      gap-4
    "
      >
        <div
          className="
        w-16
        h-16
        rounded-full
        bg-blue-500
        text-white
        flex
        items-center
        justify-center
        text-xl
        font-bold
      "
        >
          {profile.full_name?.charAt(0)?.toUpperCase()}
        </div>

        <div>
          <h2 className="font-semibold">{profile.full_name}</h2>

          <p className="text-slate-500">{profile.email}</p>
        </div>
      </div>

      {/* Profile Form */}

      <form
        onSubmit={handleProfileUpdate}
        className="
      bg-white
      border
      rounded-xl
      p-6
      space-y-4
    "
      >
        <h2 className="font-semibold">Personal Information</h2>

        <input
          type="text"
          value={profile.full_name}
          onChange={(e) =>
            setProfile({
              ...profile,
              full_name: e.target.value,
            })
          }
          placeholder="Full Name"
          className="
        w-full
        border
        rounded-lg
        p-3
      "
        />

        <input
          type="email"
          value={profile.email}
          onChange={(e) =>
            setProfile({
              ...profile,
              email: e.target.value,
            })
          }
          placeholder="Email"
          className="
        w-full
        border
        rounded-lg
        p-3
      "
        />

        <button
          className="
        bg-blue-600
        text-white
        px-4
        py-2
        rounded-lg
      "
        >
          Update Profile
        </button>
      </form>

      {/* Password Form */}

      <form
        onSubmit={handlePasswordChange}
        className="
      bg-white
      border
      rounded-xl
      p-6
      space-y-4
    "
      >
        <h2 className="font-semibold">Change Password</h2>

        <input
          type="password"
          placeholder="Current Password"
          value={passwordData.current_password}
          onChange={(e) =>
            setPasswordData({
              ...passwordData,
              current_password: e.target.value,
            })
          }
          className="
        w-full
        border
        rounded-lg
        p-3
      "
        />

        <input
          type="password"
          placeholder="New Password"
          value={passwordData.new_password}
          onChange={(e) =>
            setPasswordData({
              ...passwordData,
              new_password: e.target.value,
            })
          }
          className="
        w-full
        border
        rounded-lg
        p-3
      "
        />

        <button
          className="
        bg-blue-600
        text-white
        px-4
        py-2
        rounded-lg
      "
        >
          Change Password
        </button>
      </form>
    </div>
  );
}
