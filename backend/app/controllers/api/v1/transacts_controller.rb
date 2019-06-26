class Api::V1::TransactsController < ApplicationController

  def purchase
    @transact = Transact.create(transact_params)
    sum = (transact_params[:price].to_f * transact_params[:quantity].to_i).round(2)
    current_user.stock_withdraw(sum)
    # render json: { user: UserSerializer.new(current_user) }, status: :accepted
    render json: { transaction: @transact, balance: current_user.balance  }, status: :accepted
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
