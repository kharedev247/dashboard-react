import SpeakersList from "./SpeakersList";
import SpeakersToolbar from "./SpeakersToolbar";
import { SpeakerFilerProvider } from "../contexts/SpeakerFilterContext";

function Speakers() {
  return (
    <SpeakerFilerProvider startingShowSessions={false}>
      <SpeakersToolbar />
      <SpeakersList />
    </SpeakerFilerProvider>
  );
}

export default Speakers;
