export default function ComingSoonState({
  messageOne,
  messageTwo,
}: {
  messageOne: string;
  messageTwo?: string;
}) {
  return (
    <div className="text-center pt-10">
      <h2 className="text-[32px] font-clash font-medium text-center text-novacrust-primary">
        Coming Soon!
      </h2>
      <p className="text-base md:text-lg xl:text-xl text-novacrust-text text-center">
        {messageOne}
      </p>
      {messageTwo && (
        <p className="text-base md:text-lg xl:text-xl text-novacrust-text text-center">
          {messageTwo}
        </p>
      )}
    </div>
  );
}
