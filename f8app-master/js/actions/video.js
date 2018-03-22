import F8Analytics from "../F8Analytics";
import { Platform, Share, ActionSheetIOS } from "react-native";

import type { ThunkAction } from "./types";
import type { Video } from "../reducers/videos";

function shareVideo(video: Video): ThunkAction {
  return dispatch => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showShareActionSheetWithOptions(
        {
          message: video.title,
          url: video.shareURL
        },
        e => {},
        logShare.bind(null, video.id)
      );
    } else {
      Share.share(
        {
          // content
          title: video.title,
          message: video.shareURL
        },
        {
          // options
          dialogTitle: "Share Link to " + video.title // droid-only share option
        }
      ).then(
        // callback
        _ => logShare(video.id, true, null)
      );
    }
  };
}

function logShare(id, completed, activity) {
  F8Analytics.logEvent("Share Video", 1, { id });
  // Parse.Analytics.track('share', {
  //   id,
  //   completed: completed ? 'yes' : 'no',
  //   activity: activity || '?'
  // });
}

export { shareVideo };
