Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :users, only: [:index, :edit, :update]
  # resources :groups, only: [:index, :new, :create, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  #↓namespaceを使ってつかってコントローラファイルを呼び出すルーティング記述
    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end
  end
end

