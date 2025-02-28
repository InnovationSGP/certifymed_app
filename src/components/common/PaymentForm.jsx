import { Input } from "./Input"

export default function PaymentForm() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-6">Payment Methods</h2>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="firstName">First name</label>
            <Input id="firstName" placeholder="Enter your first name" className="bg-gray-50" />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName">Last name</label>
            <Input id="lastName" placeholder="Enter your last name" className="bg-gray-50" />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="cardNumber">Credit Card/Number</label>
          <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="bg-gray-50" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <label htmlFor="cvv">CVV</label>
            <Input id="cvv" placeholder="000" maxLength={3} className="bg-gray-50" />
          </div>
          <div className="space-y-2">
            <label htmlFor="month">MM</label>
            <Input id="month" placeholder="MM" maxLength={2} className="bg-gray-50" />
          </div>
          <div className="space-y-2">
            <label htmlFor="year">YYYY</label>
            <Input id="year" placeholder="YYYY" maxLength={4} className="bg-gray-50" />
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800">
          Submit
        </button>
      </form>
    </div>
  )
}
