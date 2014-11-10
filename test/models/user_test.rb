require 'test_helper'

class UserTest < ActiveSupport::TestCase
  context "User class" do
    should "be able to create a new user via auth" do
      auth = { "provider" => "test",
               "uid" => "10",
               "info" => {
               "name" => "Test User",
                    },
               "credentials" => { "token" => "TESTTOKEN" }
      }
      user = User.find_or_create_by_auth(auth)
      assert_not_nil user
      assert_equal "Test User", user.name
      assert user.persisted?

      assert_includes user.users,
                      User.find_by(provider: "test", uid: "10")
    end

    should "be able to find an existing user via auth" do
      auth = users(:one)
      auth = { "provider" => auth.provider,
               "uid" => auth.uid,
               "info" => {},
               "credentials" => { "token" => auth.token } }


      user = User.find_or_create_by_auth(auth)
      assert_equal auth.user, user
    end
  end

  context "a user" do
    should validate_presence_of(:name)
  end
end
