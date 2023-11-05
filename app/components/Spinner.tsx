export const Spinner = () => {
  return (
    <div>
      <svg
        className="animate-spin h-5 w-5 mr-3 text-gray-500"
        viewBox="0 0 24 24"
      >
        <path
          className="opacity-75"
          fill="currentColor"
          d={`
            M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4
            zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647
            M12 20a8 8 0 01-8-8H0c0 6.627 5.373 12 12 12v-4
            zm0-16a8 8 0 018 8h4a12.01 12.01 0 00-3-8.062A11.963 11.963 0 0012 4z
          `}
        />
      </svg>
    </div>
  );
};
