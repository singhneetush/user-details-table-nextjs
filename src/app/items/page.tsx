"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export default function ItemsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        setPosts(data);
        setLoading(false);
        setError(false);
        console.log(data);
      } catch (err) {
        console.log("Error occurred", err);
        setError(true);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const { name } = JSON.parse(storedUser);
      setUserName(name);
    }
  }, []);

  const filteredPosts = posts.filter((post) => {
    if (searchTerm.trim() === "") return true;
    const term = searchTerm.toLowerCase();

    const matchesTitle =
      searchTerm.length >= 3 && post.title.toLowerCase().includes(term);

    const matchesId =
      searchTerm.length !== 0 && post.id.toString().includes(searchTerm);

    return matchesTitle || matchesId;
  });

  const clearInput = () => {
    setSearchTerm("");
  };

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  return (
    <div className="min-h-screen">
      <div className="p-4 max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-6 ">
            Welcome{" "}
            <span className="text-[#003b6c]">
              {userName.toLocaleUpperCase()}
            </span>
          </h1>

          <Button
            onClick={() => {
              localStorage.removeItem("loggedInUser");
              router.push("/login");
            }}
          >
            Logout
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500  h-4" />
            <Input
              placeholder="Enter title or id to search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
            <X
              className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 w-4 h-4 cursor-pointer"
              onClick={clearInput}
            />
          </div>

          <div className="text-sm text-gray-600">
            Showing {filteredPosts.length}
            {filteredPosts.length === 1 ? " result" : " results"}
          </div>
        </div>

        {loading ? (
          <div className="text-gray-600">Loading posts...</div>
        ) : error ? (
          <div className="text-red-600 font-semibold text-center p-4">
            Failed to load posts. Please try again later.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-md border border-gray-300 shadow-sm">
            <Table className="w-full text-sm text-left text-gray-700">
              <TableHeader>
                <TableRow className="bg-gray-100 border-b border-gray-300">
                  <TableHead className="px-4 py-2">ID</TableHead>
                  <TableHead className="px-4 py-2">User ID</TableHead>
                  <TableHead className="px-4 py-2">Title</TableHead>
                  <TableHead className="px-4 py-2">Body</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPosts.map((post) => (
                  <TableRow
                    key={post.id}
                    className="border-b odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                  >
                    <TableCell className="px-4 py-2">{post.id}</TableCell>
                    <TableCell className="px-4 py-2">{post.userId}</TableCell>
                    <TableCell className="px-4 py-2 max-w-xs truncate">
                      {post.title}
                    </TableCell>
                    <TableCell className="px-4 py-2 max-w-md truncate">
                      {post.body}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredPosts.length !== 0 && (
              <>
                <div className="flex items-center justify-center mt-6 mb-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-2 ${
                      currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <div className="select-none">Previous</div>
                  </Button>

                  <div className="text-sm text-gray-600 mx-5 select-none">
                    Page <span className="font-semibold">{currentPage}</span> of{" "}
                    <span className="font-semibold">{totalPages}</span>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-2 ${
                      currentPage === totalPages
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                  >
                    <div className="select-none">Next</div>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </>
            )}

            {filteredPosts.length === 0 && (
              <p className="text-center text-sm text-gray-500 p-4">
                No posts match your search.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
