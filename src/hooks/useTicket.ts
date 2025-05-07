import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { Ticket, UseTicketsResponse } from "@/types/ticket-type";
import { AxiosError } from "axios";

const useTickets = (): UseTicketsResponse & {
  createTicket: (
    ticket: Omit<Ticket, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
} => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axiosInstance.get<Ticket[]>("/api/v1/tickets");
        setTickets(response.data);
      } catch (err: unknown) {
        const axiosError = err as AxiosError<{ message?: string }>;
        setError(
          axiosError.response?.data?.message || "Failed to fetch tickets"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const createTicket = async (ticket: {
    title: string;
    description: string;
    price: number;
  }) => {
    try {
      const response = await axiosInstance.post<Ticket>(
        "/api/v1/tickets",
        ticket
      );
      setTickets((prev) => [...prev, response.data]);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setError(axiosError.response?.data?.message || "Failed to create ticket");
    }
  };

  return { tickets, isLoading, error, createTicket };
};

export default useTickets;
