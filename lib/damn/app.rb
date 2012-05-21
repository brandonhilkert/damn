module Damn
  class App < Sinatra::Base
    set :root, Damn.root
    enable  :method_override

    set :sprockets, Sprockets::Environment.new(root) { |env|
      env.append_path(root.join('app', 'assets', 'stylesheets'))
      env.append_path(root.join('app', 'assets', 'javascripts'))
      env.append_path(root.join('app', 'assets', 'images'))
    }

    configure :development do
      register Sinatra::Reloader
    end

    set :redis_namespace, "damn:#{Damn::App.environment}:"

    helpers do
      def redis
        Damn.redis
      end

      def redis_namespace
        settings.redis_namespace
      end

      def asset_path(source)
        if Damn.env.production?
          "/assets/" + settings.sprockets.find_asset(source).digest_path
        else
          "/assets/" + settings.sprockets.find_asset(source).logical_path
        end
      end
    end

    get '/' do
      erb :index
    end

    get '/lists' do
      lists = redis.keys "#{redis_namespace}*"
      json lists.map{ |list| { label: list.sub(/#{redis_namespace}/, "").split("-").join(" ").capitalize, path: list.sub(/#{redis_namespace}/, "") } }
    end

    get '/lists/:id/images' do
      json get_items(params[:id]).map{ |image| { url: image } }
    end

    private

      def get_items(id)
        redis.smembers "#{redis_namespace}#{id}"
      end

      def json(data)
        content_type :json
        ActiveSupport::JSON.encode(data)
      end
  end
end