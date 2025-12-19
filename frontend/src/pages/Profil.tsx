import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Save,
  X,
} from "lucide-react";
import { Link } from "react-router";

const Profil = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    _id: "694466af3fe3bc5d69b41c09",
    fullname: "Juju",
    email: "juju@mail.com",
    phone: "+33 6 12 34 56 78",
    location: "Paris, France",
    joinDate: "15 janvier 2023",
    bio: "Passionné par la technologie et l'innovation",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juju",
  });

  const [formData, setFormData] = useState(profileData);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setProfileData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col bg-slate-900 min-h-screen">
        {/* Header */}
        <div className="navbar bg-slate-950 border-b border-slate-800 sticky top-0 z-40">
          <div className="flex-1">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-ghost drawer-button lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
            <h1 className="text-2xl font-bold px-4 text-white">Mon Profil</h1>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary btn-sm gap-2 mr-4"
            >
              <Edit2 className="w-4 h-4" />
              Modifier
            </button>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header Card */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-8 shadow-lg">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Avatar */}
                <div className="avatar">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <img
                      src={profileData.avatar}
                      alt={profileData.fullname}
                      className="rounded-full"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {profileData.fullname}
                  </h2>
                  <p className="text-gray-400 flex items-center gap-2 justify-center md:justify-start">
                    <Mail className="w-4 h-4" />
                    {profileData.email}
                  </p>
                  <p className="text-gray-400 flex items-center gap-2 justify-center md:justify-start mt-1">
                    <Calendar className="w-4 h-4" />
                    Inscrit depuis {profileData.joinDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Information */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 shadow-lg">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <User className="w-6 h-6 text-blue-400" />
                  Informations personnelles
                </h2>
              </div>

              {!isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Fullname */}
                  <div>
                    <p className="text-sm text-gray-400 font-semibold mb-2">
                      Nom complet
                    </p>
                    <p className="text-lg text-white bg-slate-700/50 p-3 rounded-lg">
                      {profileData.fullname}
                    </p>
                  </div>

                  {/* Email */}
                  <div>
                    <p className="text-sm text-gray-400 font-semibold mb-2">
                      Email
                    </p>
                    <p className="text-lg text-white bg-slate-700/50 p-3 rounded-lg">
                      {profileData.email}
                    </p>
                  </div>

                  {/* Phone */}
                  <div>
                    <p className="text-sm text-gray-400 font-semibold mb-2">
                      Téléphone
                    </p>
                    <p className="text-lg text-white bg-slate-700/50 p-3 rounded-lg">
                      {profileData.phone}
                    </p>
                  </div>

                  {/* Location */}
                  <div>
                    <p className="text-sm text-gray-400 font-semibold mb-2">
                      Localisation
                    </p>
                    <p className="text-lg text-white bg-slate-700/50 p-3 rounded-lg flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      {profileData.location}
                    </p>
                  </div>

                  {/* Bio */}
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-400 font-semibold mb-2">
                      Bio
                    </p>
                    <p className="text-lg text-white bg-slate-700/50 p-3 rounded-lg">
                      {profileData.bio}
                    </p>
                  </div>

                  {/* ID */}
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-400 font-semibold mb-2">
                      ID Utilisateur
                    </p>
                    <p className="text-sm text-gray-300 bg-slate-700/50 p-3 rounded-lg font-mono">
                      {profileData._id}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Fullname Edit */}
                  <div>
                    <label className="text-sm text-gray-400 font-semibold mb-2 block">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                    />
                  </div>

                  {/* Email Edit */}
                  <div>
                    <label className="text-sm text-gray-400 font-semibold mb-2 block">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                    />
                  </div>

                  {/* Phone Edit */}
                  <div>
                    <label className="text-sm text-gray-400 font-semibold mb-2 block">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                    />
                  </div>

                  {/* Location Edit */}
                  <div>
                    <label className="text-sm text-gray-400 font-semibold mb-2 block">
                      Localisation
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                    />
                  </div>

                  {/* Bio Edit */}
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-400 font-semibold mb-2 block">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition resize-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-3 mt-8 justify-end">
                <button
                  onClick={handleCancel}
                  className="btn btn-ghost gap-2 text-gray-300"
                >
                  <X className="w-4 h-4" />
                  Annuler
                </button>
                <button onClick={handleSave} className="btn btn-primary gap-2">
                  <Save className="w-4 h-4" />
                  Enregistrer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SideBar - Remplacer par <SideBar /> */}
      <div className="drawer-side z-40">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <div className="bg-slate-950 w-72 min-h-full border-r border-slate-800">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-blue-400 mb-8">NAUTH</h2>
          </div>
          <ul className="menu text-gray-300 space-y-2 px-4 flex-1">
            <li>
              <Link
                to="/dashboard"
                className="text-gray-300 hover:bg-slate-800 rounded"
              >
                Tableau de Bord
              </Link>
            </li>
            <li>
              <Link to="/profile" className="text-white bg-slate-800 rounded">
                Profil
              </Link>
            </li>
            <li>
              <Link to="/settings" className="hover:bg-slate-800 rounded">
                Paramètres
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profil;
