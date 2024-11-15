import CarForm from "../components/CarForm";

function Dashboard() {
  return (
    <div className="flex flex-col h-full flex-1 justify-center items-center text-white text-3xl">
      <h2 className="text-yellow-50 font-bold text-3xl mb-2 " > Welcome to CARWILLA</h2>

      <CarForm />
    </div>
  );
}

export default Dashboard;
