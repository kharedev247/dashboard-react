import Speaker from "./Speaker";
import { data } from "../../SpeakerData";
import useRequestDelay, { REQUEST_STATUS } from "../hooks/useRequestDelay";
import { SpeakerFilterContext } from "../contexts/SpeakerFilterContext";
import { useContext } from "react";
import SpeakerAdd from "./SpreakerAdd";

function SpeakersList() {
  const {
    data: speakersData,
    requestStatus,
    error,
    updateRecord,
    insertRecord,
    deleteRecord,
  } = useRequestDelay(800, data);

  const { searchQuery, eventYear } = useContext(SpeakerFilterContext);

  if (requestStatus == REQUEST_STATUS.FAILURE) {
    return (
      <div className="text-danger">
        Error: <b>loading Speaker Data Failed {error}</b>
      </div>
    );
  }

  return (
    <div className="container speaker-list">
      <SpeakerAdd eventYear={eventYear} insertRecord={insertRecord} />
      <div className="row">
        {speakersData
          .filter(function (speaker) {
            return (
              speaker.first.toLowerCase().includes(searchQuery) ||
              speaker.last.toLowerCase().includes(searchQuery)
            );
          })
          .filter(function (speaker) {
            return speaker.sessions.find((session) => {
              return session.eventYear === eventYear;
            });
          })
          .map((speaker) => {
            return (
              <Speaker
                key={speaker.id}
                speaker={speaker}
                updateRecord={updateRecord}
                insertRecord={insertRecord}
                deleteRecord={deleteRecord}
              />
            );
          })}
      </div>
    </div>
  );
}

export default SpeakersList;
