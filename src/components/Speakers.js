import SpeakersList from "./SpeakersList";
import SpeakersToolbar from "./SpeakersToolbar";
import { useState } from "react";

function Speakers() {
  const [showSession, setShowSession] = useState(true);

  return (
    <>
      <SpeakersToolbar
        showSession={showSession}
        setShowSession={setShowSession}
      />
      <SpeakersList showSession={showSession} />
    </>
  );
}

export default Speakers;
