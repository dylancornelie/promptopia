"use client";
import { useState, useEffect } from "react"
import PromptCard from "./PromptCard";

function Feed() {
  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch("/api/prompts");
      const data = await response.json();
      setPrompts(data)
    }
    fetchPrompts()
  }, []);
  const [searchText, setSearchText] = useState("")
  const [prompts, setPrompts] = useState([])

  const handleSearchChange = (e) => {

  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        prompts={prompts}
        handleTagClick={() => { }}
      />
    </section>
  )
}

const PromptCardList = ({ prompts, handleTagClick }) => (
  <div className="mt-16 prompt_layout">
    {
      prompts.map(
        (prompt) => (
          <PromptCard key={prompt._id} prompt={prompt} handleTagClick={handleTagClick} />
        )
      )
    }
  </div>
)

export default Feed