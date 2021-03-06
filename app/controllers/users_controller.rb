class UsersController < ApplicationController

  skip_before_action :authenticate_user, only: [:create], raise: false

  def current
    current_user.update!(last_login: Time.now)
    render json: current_user
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: { status: 200, data: user }
    end
  end

  def update
    user = User.find(params[:id])
    if user.update(user_params)
      render json: { status: 200, data: user }
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end

end
