using Core.Entities;
using Core.Interfaces;
using Core.Models;

namespace API.GraphQL
{
    public class Mutation
    {
        public async Task<Customer> AddOrUpdateCustomer([Service] ICustomerService customerService, CustomerModel customer) 
        {
            return await customerService.AddOrUpdateCustomerAsync(customer);
        }

        public async Task<Order> AddOrUpdateOrder([Service] IOrderService orderService, OrderModel order)
        {
            return await orderService.AddOrUpdateOrderAsync(order);
        }
    }
}