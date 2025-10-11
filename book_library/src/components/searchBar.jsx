import { SearchIcon, X } from "lucide-react";
import { useState } from "react";

function SearchBar() {
  const [local, setLocal] = useState("");
  const handleClearText = () => {
    setLocal("");
  };
  return (
    <section className="flex items-center gap-1">
      <div className="border h-[36px] flex items-center">
        <select name="filers">
          <option value="apple">ALL</option>
          <option value="banana">Banana</option>
          <option value="orange">Orange</option>
          <option value="mango">Mango</option>
        </select>
      </div>
      <form className="flex items-center w-fit justify-between gap-1">
        <input
          type="search"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          className="h-[36px] w-[250px] border p-4 focus:outline-none focus:ring-0 "
        />
        {local && (
          <>
            <button
              type="button"
              onClick={handleClearText}
              className="h-[36px] border-black border w-[36px] flex justify-center items-center text-red-400 hover:text-red-600"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          </>
        )}
        <div className="mx-auto border-black border h-[36px] w-[36px] flex justify-center items-center text-blue-400 cursor-pointer">
          <SearchIcon className="h-5 w-5" />
        </div>
      </form>
    </section>
  );
}

export default SearchBar;
