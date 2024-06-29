function SidebarHumburger({
  onToggleSidebar,
  handleHumburgerOpen,
  isHumburgerOpen,
}) {
  return (
    <div>
      <div
        className="humburger"
        onClick={() => {
          onToggleSidebar();
          handleHumburgerOpen();
        }}
      >
        <span
          className={`firstSpan ${isHumburgerOpen ? "active" : "notActive"}`}
        ></span>
        <span
          className={`secondSpan ${isHumburgerOpen ? "active" : "notActive"}`}
        ></span>
        <span
          className={`thirdSpan ${isHumburgerOpen ? "active" : "notActive"}`}
        ></span>
      </div>
    </div>
  );
}

export default SidebarHumburger;
