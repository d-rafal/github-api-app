import Menu from "@mui/material/Menu";
import { styled } from "@mui/system";
import { Avatar, Typography } from "@mui/material";
import { useState } from "react";

const Button = styled("button")({
  appearance: "none",
  display: "flex",
  marginLeft: "auto",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  border: "none",
  color: "inherit",
  backgroundColor: "transparent",
  fontSize: "inherit",
  outline: "none",

  "&:focus-visible": {
    outline: "#42a5f5 solid 2px",
  },
});

const ListElement = styled("li")({
  padding: "1rem 2rem",
  " +li": {
    paddingTop: "0",
  },
});

interface Props {
  login: string;
  avatarUr: string;
}

export default function RepoOwnerCell({ login, avatarUr }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openModal = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-controls={openModal ? "owner-avatar" : undefined}
        aria-haspopup="true"
        aria-expanded={openModal ? "true" : undefined}
        onClick={handleClick}
      >
        {login}
      </Button>
      <Menu
        id="owner-avatar"
        anchorEl={anchorEl}
        open={openModal}
        onClose={handleClose}
      >
        <ListElement>
          <Avatar sx={{ width: 60, height: 60 }} alt={login} src={avatarUr} />
        </ListElement>
        <ListElement>
          <Typography sx={{ textAlign: "center" }}>{login}</Typography>
        </ListElement>
      </Menu>
    </>
  );
}
