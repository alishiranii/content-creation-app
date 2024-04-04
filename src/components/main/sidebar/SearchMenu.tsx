"use client"
import "react-cmdk/dist/cmdk.css";
import CommandPalette, { filterItems, getItemIndex, useHandleOpenCommandPalette } from "react-cmdk";
import { useState } from "react";
import { SearchMenuProps } from "@/types/components";

const SearchMenu = ({isOpen,setIsOpen}:SearchMenuProps) => {
  const [page, setPage] = useState<"root" | "projects">("root");
  const [search, setSearch] = useState("");

  useHandleOpenCommandPalette(setIsOpen);



  const filteredItems = filterItems(
    [
      {
        heading: "Home",
        id: "home",
        items: [
          {
            id: "home",
            children: "Home",
            icon: "HomeIcon",
            href: "#",
          },
        ],
      },
      {
        heading: "Other",
        id: "advanced",
        items: [
          {
            id: "privacy-policy",
            children: "Privacy policy",
            icon: "LifebuoyIcon",
            href: "#",
          },
          {
            id: "log-out",
            children: "Log out",
            icon: "ArrowRightOnRectangleIcon",
            onClick: () => {
              alert("Logging out...");
            },
          },
        ],
      },
    ],
    search
  );

  return (
    <CommandPalette
      onChangeSearch={setSearch}
      onChangeOpen={setIsOpen}
      search={search}
      isOpen={isOpen}
      page={page}
    >
      <CommandPalette.Page id="root">
        {filteredItems.length ? (
          filteredItems.map((list) => (
            <CommandPalette.List key={list.id} heading={list.heading}>
              {list.items.map(({ id, ...rest }) => (
                <CommandPalette.ListItem
                  key={id}
                  index={getItemIndex(filteredItems, id)}
                  {...rest}
                />
              ))}
            </CommandPalette.List>
          ))
        ) : (
          <CommandPalette.FreeSearchAction />
        )}
      </CommandPalette.Page>
    </CommandPalette>
  );
};

export default SearchMenu;