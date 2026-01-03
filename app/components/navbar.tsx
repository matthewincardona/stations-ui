export default function Navbar() {
  return (
    <nav className="max-w-full flex justify-center bg-[#4C73F2] text-white py-2 px-3">
      <div className="flex justify-between h-12 max-w-400 grow items-center rounded-xl ">
        <div className="flex gap-4">
          <a href="/">
            <p>
              <b>Stations</b>
            </p>
          </a>
          <p>Entry Level Jobs For Tech People</p>
        </div>
        <ul className="flex gap-4">
          <li className="underline">
            <a href="https://stations.matthewincardona.com">Find Jobs</a>
          </li>
          <li className="underline">
            <a href="https://stations.parser.matthewincardona.com">
              Test Your Resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
