import Speaker from "./Speaker";
import { data } from "../../SpeakerData";
import useRequestDelay, { REQUEST_STATUS } from "../hooks/useRequestDelay";

function SpeakersList({ showSession }) {
  const {
    data: speakersData,
    requestStatus,
    error,
    updateRecord,
  } = useRequestDelay(800, data);

  if (requestStatus == REQUEST_STATUS.FAILURE) {
    return (
      <div className="text-danger">
        Error: <b>loading Speaker Data Failed {error}</b>
      </div>
    );
  }

  return (
    <div className="container speaker-list">
      <div className="row">
        {speakersData.map((speaker) => {
          return (
            <Speaker
              key={speaker.id}
              speaker={speaker}
              showSession={showSession}
              onFavoriteToggle={(doneCallback) => {
                updateRecord(
                  { ...speaker, favorite: !speaker.favorite },
                  doneCallback
                );
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SpeakersList;
