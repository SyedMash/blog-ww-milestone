"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

const Comments = () => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [disabled, setDisabled] = useState(true);

  const nameRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const commentDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedComments = localStorage.getItem("blogComments");
    if (savedComments && commentDivRef.current) {
      commentDivRef.current.innerHTML = savedComments;

      const deleteButtons = commentDivRef.current.querySelectorAll("button");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
          button.parentElement?.remove();

          localStorage.setItem(
            "blogComments",
            commentDivRef.current?.innerHTML || ""
          );
        });
      });
    }
  }, []);

  useEffect(() => {
    if (name && comment) {
      setDisabled(false);
    }
  }, [name, comment]);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const element = document.createElement("div");
    element.classList.add("custom");
    element.innerHTML = `
    <h1>${name}</h1>
    <p>${comment}</p>
    `;
    const button = document.createElement("button");
    button.innerHTML = "Delete";
    button.addEventListener("click", () => {
      element.remove();
      localStorage.setItem(
        "blogComments",
        commentDivRef.current?.innerHTML || ""
      );
    });

    element.appendChild(button);
    commentDivRef.current?.appendChild(element);

    localStorage.setItem(
      "blogComments",
      commentDivRef.current?.innerHTML || ""
    );

    setName("");
    setComment("");
    setDisabled(true);
  };

  return (
    <div className="min-h-screen container mx-auto">
      <div className="mt-6">
        <h1 className="font-semibold text-xl md:text-2xl">Your thoughts</h1>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <input
            ref={nameRef}
            type="text"
            placeholder="Name"
            className="rounded-full p-2"
            value={name}
            onChange={() => {
              setName(nameRef.current?.value as string);
            }}
          />
          <textarea
            ref={commentRef}
            className="rounded-lg p-2"
            rows={12}
            placeholder="comment"
            value={comment}
            onChange={() => {
              setComment(commentRef.current?.value as string);
            }}
          />
          <Button className="bg-red-400" disabled={disabled}>
            Submit
          </Button>
        </form>
      </div>
      <h1 className="mt-12 text-xl md:text-2xl lg:text-3xl font-bold">
        Comments
      </h1>
      <div ref={commentDivRef}></div>
    </div>
  );
};

export default Comments;
