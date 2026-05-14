export class SessionSpeakerDTO {
  constructor(speaker) {
    this.id = speaker.id;
    this.full_name = speaker.full_name;
    this.photo_url = speaker.photo_url;
  }
}

export class SessionDTO {
  constructor(session) {
    const now = new Date();

    this.id = session.id;
    this.title = session.title;
    this.description = session.description;
    this.start_time = session.start_time;
    this.end_time = session.end_time;
    this.capacity = session.capacity;
    this.room = session.room.name;
    this.speakers = session.speakers.map((ss) => new SessionSpeakerDTO(ss.speaker));
    this.is_live = now >= session.start_time && now <= session.end_time;
  }
}

export class EventDTO {
  constructor(event) {
    this.id = event.id;
    this.title = event.title;
    this.description = event.description;
    this.start_date = event.start_date;
    this.end_date = event.end_date;
    this.location = event.location;
    this.sessions = event.sessions.map((s) => new SessionDTO(s));
  }
}