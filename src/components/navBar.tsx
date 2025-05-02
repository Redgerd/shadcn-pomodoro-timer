import { Settings } from "@/components/settings";

const NavBar = () => {
  return (
    <nav className='rounded-lg border bg-card text-card-foreground shadow-sm p-4  flex w-full justify-between items-center px-10'>
      <p className='text-xl font-bold'>Pomodoro Timer</p>
      <Settings />
    </nav>
  );
};

export default NavBar;
