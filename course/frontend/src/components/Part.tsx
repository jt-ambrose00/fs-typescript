import { type CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
      case 'basic':
        return (
          <div>
            <div>{part.name} {part.exerciseCount}</div>
            <div>{part.description}</div>
            <br />
          </div>
        )
      case 'group':
        return (
          <div>
            <div>{part.name} {part.exerciseCount}</div>
            <div>project exercises {part.groupProjectCount}</div>
            <br />
          </div>
        )
      case 'background':
        return (
          <div>
            <div>{part.name} {part.exerciseCount}</div>
            <div>{part.description}</div>
            <div>submit to {part.backgroundMaterial}</div>
            <br />
          </div>
        )
      case 'special':
        return (
          <div>
            <div>{part.name} {part.exerciseCount}</div>
            <div>{part.description}</div>
            <div>required skills {part.requirements.map(
              requirement => <span key={requirement}>{requirement} </span>)}
            </div>
            <br />
          </div>
        )
      default:
        return assertNever(part);
    }
};

export default Part;
