export class Channel {
  channelId: string;
  name: string;
  description?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    channelId: string,
    name: string,
    createdBy: string,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    description?: string
  ) {
    this.channelId = channelId;
    this.name = name;
    this.description = description;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Methode, um ein Channel-Objekt aus Firestore-Daten zu erstellen
  static fromFirestoreData(data: any, id: string): Channel {
    return new Channel(
      id,
      data.name,
      data.createdBy,
      new Date(data.createdAt),
      new Date(data.updatedAt),
      data.description
    );
  }
}
