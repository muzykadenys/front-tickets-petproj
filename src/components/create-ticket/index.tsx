"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useTickets from "@/hooks/useTicket";

export function CreateTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const { createTicket } = useTickets();

  const handleSubmit = async () => {
    if (!title || !description || !price) {
      console.error("All fields are required");
      return;
    }

    try {
      await createTicket({
        title,
        description,
        price: Number(price),
      });

      setTitle("");
      setDescription("");
      setPrice("");
      // Close the dialog after successful submit
      document.getElementById("close-dialog-btn")?.click();
    } catch (error) {
      console.error("Failed to create ticket", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add ticket</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Ticket</DialogTitle>
          <DialogDescription>
            Enter ticket details and click save.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Kyiv - Lviv"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Fast train ticket"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 599"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save ticket</Button>
          {/* Hidden close button to trigger dialog close */}
          <DialogClose id="close-dialog-btn" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
