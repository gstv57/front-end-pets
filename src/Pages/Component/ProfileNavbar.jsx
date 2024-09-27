const ProfileNavbar = () => {
  return (
    <nav
      className="p-1 flex flex-row-reverse text-white bg-custom-btn_primary dark:bg-gray-800 "
      aria-label="Breadcrumb"
    >
      <img
        className="w-10 h-10 rounded-full"
        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        alt="Rounded avatar"
      ></img>
    </nav>
  );
};

export default ProfileNavbar;
