const Breadcrumb = ({ path }) => {
  const directories = path.split("/");

  return (
    <nav
      className="flex px-5 py-3 text-custom-primary border border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {directories.map((dir, index) => (
          <li key={index} className="inline-flex items-center">
            {index < directories.length - 1 ? (
              <>
                <a
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-custom-btn_primary_hover hover:text-custom-btn_primary"
                >
                  {dir}
                </a>
                <svg
                  className="rtl:rotate-180 block w-3 h-3 mx-1 text-custom-primary"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </>
            ) : (
              <span className="ms-1 text-sm font-medium text-custom-btn_primary md:ms-2 dark:text-gray-400">
                {dir}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
