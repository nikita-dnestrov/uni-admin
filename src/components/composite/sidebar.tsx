import { Button } from "../ui/button";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Menu</h2>
      <Button variant="ghost" className="mb-2">
        Dashboard
      </Button>
      <Button variant="ghost" className="mb-2">
        Manage Content
      </Button>
      <Button variant="ghost" className="mb-2">
        Users
      </Button>
      <Button variant="ghost" className="mb-2">
        Settings
      </Button>
      <Button variant="ghost" className="mb-2">
        Logout
      </Button>
    </div>
  );
}
