export class SpeakerSessionDTO {
  constructor(session) {
    const now = new Date();

    this.id = session.id;
    this.title = session.title;
    this.description = session.description;
    this.start_time = session.start_time;
    this.end_time = session.end_time;
    this.room = session.room.name;

    this.event = {
      id: session.event.id,
      title: session.event.title,
    };

    this.is_live =
      now >= session.start_time &&
      now <= session.end_time;
  }
}

export class SpeakerPageDTO {
  constructor(speaker) {
    this.id = speaker.id;
    this.full_name = speaker.full_name;
    this.bio = speaker.bio;
    this.photo_url = speaker.photo_url;
    this.external_links = speaker.external_links;

    this.sessions = (speaker.session_speakers || []).map((ss) =>
      ss.session ? new SpeakerSessionDTO(ss.session) : null
    ).filter(Boolean);
  }
}