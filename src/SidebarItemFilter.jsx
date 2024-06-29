import xMark from "./assets/x-mark.png";
function SidebarItemFilter({ handleCleanFilters }) {
  //this component clears all filters
  return (
    <div className="sidebar_item">
      <p>Filters</p>
      <div className="sidebarFilter" onClick={() => handleCleanFilters(true)}>
        <p>clear filters</p>
        <img src={xMark} alt="" />
      </div>
    </div>
  );
}
export default SidebarItemFilter;
