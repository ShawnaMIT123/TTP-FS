class Api::V1::TransactsController < ApplicationController

  def purchase
    @transact = Transact.create(transact_params)
    @transacts= current_user.transacts
    sum = (transact_params[:price].to_f * transact_params[:quantity].to_i).round(2)
    ticker = transact_params[:ticker]
    current_user.stock_withdraw(sum)
    ticker_quantity_sum = Transact.find_transactions_quantity_sum(@transacts, transact_params[:ticker])
    render json: { transaction: TransactSerializer.new(@transact), balance: current_user.balance, ticker_quantity_sum: ticker_quantity_sum, ticker: transact_params[:ticker]}, status: :accepted
  end

  def index
    @transacts= current_user.transacts
    map = Transact.transactions_map(@transacts)
    render json: { transactions: @transacts, transactions_map: map}, status: :accepted
  end


  private
  def transact_params
    params.require(:transact).permit(:ticker, :price, :quantity).merge(:user_id => current_user.id)
  end
end
