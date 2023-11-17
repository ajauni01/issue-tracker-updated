import LatestIssues from "./LatestIssues";
import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <LatestIssues/>
  );
}

// TODO: investigate how does the searchParams object get the page number and pass it to the Pagination component