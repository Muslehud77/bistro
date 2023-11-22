
import usePaymentHistory from '../../../Hooks/usePaymentHistory';
import SectionHeader from './../../../Shared/SectionHeader/SectionHeader';
const PaymentHistory = () => {
    const [paymentHistory] = usePaymentHistory()

    const convertedDate = (dateString)=>{
        const date = new Date(dateString);
         const options = {
           weekday: "long",
           year: "numeric",
           month: "long",
           day: "numeric",
         };
         const formattedDate = date.toLocaleDateString("en-US", options);
         return formattedDate
    }



   
    return (
      <div>
        <SectionHeader
          mini={"---At a Glance!---"}
          heading={"PAYMENT HISTORY"}
        ></SectionHeader>

        <div className="flex justify-between">
          <h2 className="text-3xl mt-2">
            Total Payments: {paymentHistory.length}
          </h2>
        </div>

        <div>
          <div className="overflow-x-auto rounded-xl mt-5">
            <table className="table">
              {/* head */}
              <thead className="">
                <tr className="bg-[#D1A054]">
                  <th className="py-5">#</th>
                  <th className="py-5">Email</th>
                  <th className="py-5">Category</th>
                  <th className="py-5">Total Price</th>
                  <th className="py-5">Payment Date</th>
                  <th className="py-5">Transaction id</th>
                  <th className="py-5">Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((item, i) => (
                  <tr key={item._id}>
                    <th>{i + 1}</th>
                    <td>
                      <h4 className="text-lg">{item.email}</h4>
                    </td>
                    <td>
                      <h4 className="text-lg">Food Order</h4>
                    </td>
                    <td>${item.amount.toFixed(2)}</td>
                    <td>{convertedDate(item.date)}</td>
                    <td>{item.transactionId}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
              {/* foot */}
              <tfoot></tfoot>
            </table>
          </div>
        </div>
      </div>
    );
};

export default PaymentHistory;