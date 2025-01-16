import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteUser } from "@/lib/axios/user-service";
export default function UserDeleteModal({ deleteID }: { deleteID: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = async () => {
    await deleteUser(deleteID);
    setIsOpen(false);
    window.location.reload();
  };
  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="outline">
        <Trash2 className="h-4 w-4" />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <span>Are you sure you want to delete this user?</span>
            <Button
              className="bg-white text-gray-900 border-black border-2 hover:bg-[#edeef0]"
              onClick={handleDelete}
            >
              Yes
            </Button>
            <Button onClick={() => setIsOpen(false)}>No</Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
