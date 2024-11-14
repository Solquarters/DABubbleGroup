export class Channel {
    id: string;
    name: string;
    description?: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      id: string,
      name: string,
      createdBy: string,
      createdAt: Date = new Date(),
      updatedAt: Date = new Date(),
      description?: string
    ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.createdBy = createdBy;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  
    // Optional: Methode, um ein Channel-Objekt aus Firestore-Daten zu erstellen
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
  