import Dropdown from "../Dropdowns";
import "./index.css"
const Header = () => {
  return (
    <>
      <header className="flex w-full p-4 mt-4 mb-4">
        <div className="title w-2/3">
          <h1 className="text-3xl font-bold">Overview</h1>
        </div>
        <div className="flex justify-end items-center w-3/12">
          <label>
            <input type="search" placeholder="Quick find" className="search w-72 h-10 p-3"/>
          </label>
        </div>
        <div className="flex justify-end settings w-1/12 h-full">
          <Dropdown />
        </div>
      </header>
    </>
  );
};

export default Header;
