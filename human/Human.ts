interface CreateHumanProps {
  id: HumanId;
  bloodType: BloodType;
  birthday: Birthday;
  name: HumanName;
}

class Human {
  readonly #id: HumanId;
  readonly #bloodType: BloodType;
  readonly #birthday: Birthday;
  readonly #name: HumanName;

  private constructor(
    id: HumanId,
    bloodType: BloodType,
    birthday: Birthday,
    name: HumanName
  ) {
    this.#id = id;
    this.#bloodType = bloodType;
    this.#birthday = birthday;
    this.#name = name;
  }

  static create({ id, bloodType, birthday, name }: CreateHumanProps) {
    return new Human(id, bloodType, birthday, name);
  }

  get age() {
    return this.#birthday.age;
  }
}
class HumanId {
  type = "HumanId" as const;

  constructor(readonly value: string) {
    const isValid = /^[a-zA-Z0-9]+$/.test(value);

    if (!isValid) {
      throw new Error("HumanId must be alphanumeric");
    }
  }

  equals(other: HumanId): boolean {
    return this.value === other.value && this.type === other.type;
  }
}

class BloodType {
  type = "BloodType" as const;

  static bloodTypes = ["a", "b", "o", "ab"];

  constructor(readonly value: string) {
    const isValid = BloodType.bloodTypes.includes(value);

    if (!isValid) {
      throw new Error("BloodType must be a, b, o, or ab");
    }
  }

  equals(other: BloodType): boolean {
    return this.value === other.value && this.type === other.type;
  }
}

class Birthday {
  type = "Birthday" as const;

  constructor(readonly value: Date) {
    const isValid = value.getFullYear() < new Date().getFullYear() - 20;

    if (!isValid) {
      throw new Error("Birthday must be 20 years or older");
    }
  }

  get age() {
    const today = new Date();
    const diff = today.getTime() - this.value.getTime();
    const age = new Date(diff).getFullYear() - 1970;

    return age;
  }

  equals(other: Birthday): boolean {
    return this.value.getTime() === other.value.getTime() && this.type === other.type;
  }
}

class HumanName {
  type = "HumanName" as const;

  constructor(readonly value: string) {
    const isValid = value.length < 20;

    if (!isValid) {
      throw new Error("HumanName must be less than 20 characters");
    }
  }

  equals(other: HumanName): boolean {
    return this.value === other.value && this.type === other.type;
  }
}
