import "./index.css";
//! Sau khi design -> thay button = link
const Sidebar = () => {
  return (
    <>
      <div className="side-bar flex-col w-full h-full bg-white p-4">
        <div className="user flex w-full">
          <img
            src="data:image/jpeg;base64,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"
            alt=""
            className="mt-4 mr-2"
          />
          <div className="mt-4 ml-2">
            <button className="text-2xl font-bold">Chou Lee</button>
            <p className="text-l text-gray-400">Admin</p>
          </div>
        </div>

        <div className="main-menu w-full h-1/2">
          <h3 className="text-lg font-bold">Main menu</h3>
          <ul className="list">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>
              Customers
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                />
              </svg>
              Products
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                />
              </svg>
              Statistics
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
              Starred
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              All tasks
            </button>
          </ul>
        </div>
        <div className="flex items-end w-full h-1/4 text-gray-400">
          <p>@Copyright Chou Lee</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
